// User domain types and business logic
// Type-Driven Development: Functional Core for user management
// @genType: TypeScript integration enabled
open Core

module Role = {
  @genType
  type t =
    | User
    | Admin

  @genType
  let toString = (role: t): string => {
    switch role {
    | User => "user"
    | Admin => "admin"
    }
  }

  @genType
  let fromString = (str: string): option<t> => {
    switch str {
    | "user" => Some(User)
    | "admin" => Some(Admin)
    | _ => None
    }
  }

  @genType
  let canManageOutages = (role: t): bool => {
    switch role {
    | Admin => true
    | User => false
    }
  }

  @genType
  let canManageUsers = (role: t): bool => {
    switch role {
    | Admin => true
    | User => false
    }
  }
}

module Buffer = {
  type t

  // Bind to the `toString` method on a Buffer instance.
  // The @send pipe allows us to use it like `buffer->Buffer.toString("hex")`.
  @send external toString: (t, string) => string = "toString"
}

@genType
type t = {
  id: Uuid.t,
  email: string,
  firstName: string,
  lastName: string,
  role: Role.t,
  isActive: bool,
  createdAt: Timestamp.t,
  updatedAt: Timestamp.t,
  lastLoginAt: option<Timestamp.t>,
}

@genType
let create = (
  ~id,
  ~email,
  ~firstName,
  ~lastName,
  ~role,
  ~isActive=true,
  ~createdAt,
  ~updatedAt,
  ~lastLoginAt=?,
): Validation.result<t> => {
  let user = {
    id,
    email,
    firstName,
    lastName,
    role,
    isActive,
    createdAt,
    updatedAt,
    lastLoginAt,
  }

  // Validate business rules using comprehensive validation utilities
  let validations = [
    ValidationUtils.isNotEmpty(email, "Email"),
    ValidationUtils.isValidEmail(email),
    ValidationUtils.hasMinLength(email, 5, "Email"),
    ValidationUtils.hasMaxLength(email, 255, "Email"),
    ValidationUtils.isNotEmpty(firstName, "First name"),
    ValidationUtils.hasMinLength(firstName, 1, "First name"),
    ValidationUtils.hasMaxLength(firstName, 100, "First name"),
    ValidationUtils.isNotEmpty(lastName, "Last name"),
    ValidationUtils.hasMinLength(lastName, 1, "Last name"),
    ValidationUtils.hasMaxLength(lastName, 100, "Last name"),
  ]

  let errors = ValidationUtils.validateAll(validations)

  if Array.length(errors) > 0 {
    Validation.Invalid(errors)
  } else {
    Validation.Valid(user)
  }
}

@genType
let updateLastLogin = (user: t): t => {
  {...user, lastLoginAt: Some(Js.Date.make()), updatedAt: Js.Date.make()}
}

@genType
let deactivate = (user: t): t => {
  {...user, isActive: false, updatedAt: Js.Date.make()}
}

@genType
let activate = (user: t): t => {
  {...user, isActive: true, updatedAt: Js.Date.make()}
}

@genType
let changeRole = (user: t, newRole: Role.t): t => {
  {...user, role: newRole, updatedAt: Js.Date.make()}
}

@genType
let fullName = (user: t): string => {
  user.firstName ++ " " ++ user.lastName
}

@genType
let canPerformAction = (user: t, action: string): bool => {
  switch action {
  | "manage_outages" => Role.canManageOutages(user.role)
  | "manage_users" => Role.canManageUsers(user.role)
  | "view_dashboard" => user.isActive
  | _ => false
  }
}

@genType
let isEligibleForNotifications = (user: t): bool => {
  user.isActive
}

module Session = {
  @genType
  type t = {
    userId: Uuid.t,
    token: string,
    expiresAt: Timestamp.t,
    createdAt: Timestamp.t,
    ipAddress: option<string>,
    userAgent: option<string>,
  }

  @genType
  let create = (
    ~userId,
    ~token,
    ~expiresAt,
    ~createdAt,
    ~ipAddress=?,
    ~userAgent=?,
  ): Validation.result<t> => {
    let session = {
      userId,
      token,
      expiresAt,
      createdAt,
      ipAddress,
      userAgent,
    }

    let mut_errors = []

    if token == "" {
      mut_errors->Array.push("Token cannot be empty")
    }

    if String.length(token) < 32 {
      mut_errors->Array.push("Token must be at least 32 characters")
    }

    if Js.Date.getTime(expiresAt) <= Js.Date.getTime(createdAt) {
      mut_errors->Array.push("Session expiration must be after creation")
    }

    // Session should expire within reasonable time (max 24 hours)
    let maxSessionHours = 24.0
    let maxSessionMs = maxSessionHours *. 60.0 *. 60.0 *. 1000.0
    if Js.Date.getTime(expiresAt) -. Js.Date.getTime(createdAt) > maxSessionMs {
      mut_errors->Array.push("Session duration exceeds maximum allowed time")
    }

    if Belt.Array.length(mut_errors) > 0 {
      Validation.Invalid(mut_errors)
    } else {
      Validation.Valid(session)
    }
  }

  @genType
  let isExpired = (session: t): bool => {
    Js.Date.getTime(session.expiresAt) <= Js.Date.getTime(Js.Date.make())
  }

  @genType
  let timeUntilExpiry = (session: t): float => {
    Js.Date.getTime(session.expiresAt) -. Js.Date.getTime(Js.Date.make())
  }

  @genType
  let isValidForIp = (session: t, ipAddress: string): bool => {
    switch session.ipAddress {
    | Some(sessionIp) => sessionIp == ipAddress
    | None => true // No IP restriction
    }
  }

  @genType
  let isValidForUserAgent = (session: t, userAgent: string): bool => {
    switch session.userAgent {
    | Some(sessionUserAgent) => sessionUserAgent == userAgent
    | None => true // No user agent restriction
    }
  }

  @genType
  let shouldRotate = (session: t): bool => {
    // Rotate token if it's close to expiration (less than 1 hour)
    timeUntilExpiry(session) < 60.0 *. 60.0 *. 1000.0
  }

  @module("crypto")
  external randomBytes: int => Buffer.t = "randomBytes"

  @genType
  let generateSecureToken = (): string => {
    // 1. Generate 32 random bytes, which returns a Buffer.
    // 2. Pipe the Buffer into its `toString` method with "hex" encoding.
    randomBytes(32)->Buffer.toString("hex")
  }

  @genType
  let refresh = (session: t, newExpiresAt: Timestamp.t): Validation.result<t> => {
    // Generate new secure token on refresh to prevent token reuse
    let newToken = generateSecureToken()
    create(
      ~userId=session.userId,
      ~token=newToken,
      ~expiresAt=newExpiresAt,
      ~createdAt=Js.Date.make(), // Reset creation time for new token
      ~ipAddress=Option.getOr(session.ipAddress, ""),
      ~userAgent=Option.getOr(session.userAgent, "")
    )
  }
}
