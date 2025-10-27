open Core

@genType
module Status = {
  type t =
    | Unverified
    | Verified
    | InProgress
    | Resolved

  let toString = (status: t): string => {
    switch status {
    | Unverified => "unverified"
    | Verified => "verified"
    | InProgress => "in_progress"
    | Resolved => "resolved"
    }
  }

  let fromString = (str: string): option<t> => {
    switch str {
    | "unverified" => Some(Unverified)
    | "verified" => Some(Verified)
    | "in_progress" => Some(InProgress)
    | "resolved" => Some(Resolved)
    | _ => None
    }
  }

  let canTransition = (from: t, to_: t): bool => {
    switch (from, to_) {
    | (Unverified, Verified) => true
    | (Unverified, Resolved) => true
    | (Verified, InProgress) => true
    | (Verified, Resolved) => true
    | (InProgress, Resolved) => true
    | (Resolved, InProgress) => true // Allow reopening resolved outages
    | _ => false
    }
  }
}

@genType
type t = {
  id: Uuid.t,
  status: Status.t,
  confidencePercentage: Percentage.t,
  title: string,
  description: option<string>,
  location: Location.t,
  affectedCustomers: int,
  estimatedRestoration: option<Timestamp.t>,
  actualRestoration: option<Timestamp.t>,
  reportedAt: Timestamp.t,
  createdAt: Timestamp.t,
  updatedAt: Timestamp.t,
}

@genType
let create = (
  ~id,
  ~status,
  ~confidencePercentage,
  ~title,
  ~description=?,
  ~location,
  ~affectedCustomers=0,
  ~estimatedRestoration=?,
  ~actualRestoration=?,
  ~reportedAt,
  ~createdAt,
  ~updatedAt,
): Validation.result<t> => {
  let confidenceValidation = Percentage.create(confidencePercentage)

  Validation.bind(confidenceValidation, confidence => {
    // Apply XSS prevention by escaping HTML in title and description
    let safeTitle = ValidationUtils.escapeHtml(title)
    let safeDescription = switch description {
    | Some(desc) => Some(ValidationUtils.escapeHtml(desc))
    | None => None
    }

    let outage = {
      id,
      status,
      confidencePercentage: confidence,
      title: safeTitle,
      description: safeDescription,
      location,
      affectedCustomers,
      estimatedRestoration,
      actualRestoration,
      reportedAt,
      createdAt,
      updatedAt,
    }

    // Validate business rules
    let mut_errors = []

    if title == "" {
      mut_errors->Array.push("Title cannot be empty")
    }

    if affectedCustomers < 0 {
      mut_errors->Array.push("Affected customers cannot be negative")
    }

    // Validate location coordinates
    if !Coordinates.isValid(location.coordinates) {
      mut_errors->Array.push("Invalid location coordinates")
    }

    // Additional XSS prevention: check for suspicious patterns
    let suspiciousPatterns = ["<script", "javascript:", "onload=", "onerror="]
    let hasSuspiciousPattern = Belt.Array.some(suspiciousPatterns, pattern =>
      Js.String2.includes(pattern, title)
    )
    if hasSuspiciousPattern {
      mut_errors->Array.push("Title contains potentially unsafe content")
    }

    let errors = mut_errors

    if Array.length(errors) > 0 {
      Validation.Invalid(errors)
    } else {
      Validation.Valid(outage)
    }
  })
}

@genType
let isActive = (outage: t): bool => {
  switch outage.status {
  | Unverified | Verified | InProgress => true
  | Resolved => false
  }
}

@genType
let updateStatus = (outage: t, newStatus: Status.t): Validation.result<t> => {
  if Status.canTransition(outage.status, newStatus) {
    Validation.Valid({...outage, status: newStatus, updatedAt: Js.Date.make()})
  } else {
    Validation.Invalid(["Invalid status transition"])
  }
}

@genType
let markAsResolved = (outage: t): Validation.result<t> => {
  Validation.map(updatedOutage => {
    {...updatedOutage, actualRestoration: Some(Js.Date.make())}
  }, updateStatus(outage, Resolved))
}

@genType
let calculateEstimatedRestoration = (outage: t): option<Timestamp.t> => {
  switch outage.status {
  | Unverified => None
  | Verified =>
    let baseTime = Js.Date.make()
    let estimatedTime = Js.Date.fromFloat(
      Js.Date.getTime(baseTime) +. 6.0 *. 60.0 *. 60.0 *. 1000.0,
    )
    Some(estimatedTime)
  | InProgress =>
    let baseTime = Js.Date.make()
    let estimatedTime = Js.Date.fromFloat(
      Js.Date.getTime(baseTime) +. 2.0 *. 60.0 *. 60.0 *. 1000.0,
    )
    Some(estimatedTime)
  | Resolved => outage.actualRestoration
  }
}

@genType
let isHighConfidence = (outage: t): bool => {
  outage.confidencePercentage >= 80.0
}

@genType
let isCritical = (outage: t): bool => {
  outage.affectedCustomers > 100 && isHighConfidence(outage)
}