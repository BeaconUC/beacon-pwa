@genType
let isNotEmpty = (value: string, fieldName: string): option<string> => {
  if value == "" {
    Some(fieldName ++ " cannot be empty")
  } else {
    None
  }
}

@genType
let hasMinLength = (value: string, minLength: int, fieldName: string): option<string> => {
  if String.length(value) < minLength {
    Some(fieldName ++ " must be at least " ++ Js.Int.toString(minLength) ++ " characters")
  } else {
    None
  }
}

@genType
let hasMaxLength = (value: string, maxLength: int, fieldName: string): option<string> => {
  if String.length(value) > maxLength {
    Some(fieldName ++ " must be at most " ++ Js.Int.toString(maxLength) ++ " characters")
  } else {
    None
  }
}

@genType
let matchesPattern = (value: string, pattern: Js.Re.t, fieldName: string, errorMsg: string): option<
  string,
> => {
  if !Js.Re.test_(pattern, value) {
    Some(fieldName ++ " " ++ errorMsg)
  } else {
    None
  }
}

// Numeric validation
@genType
let isInRange = (value: int, min: int, max: int, fieldName: string): option<string> => {
  if value < min || value > max {
    Some(
      fieldName ++ " must be between " ++ Js.Int.toString(min) ++ " and " ++ Js.Int.toString(max),
    )
  } else {
    None
  }
}

@genType
let isPositive = (value: int, fieldName: string): option<string> => {
  if value < 0 {
    Some(fieldName ++ " must be positive")
  } else {
    None
  }
}

@genType
let emailRegex = Js.Re.fromString("^[^@]+@[^@]+\\.[^@]+$")

@genType
let isValidEmail = (email: string): option<string> => {
  // Additional security checks beyond regex
  if email == "" {
    Some("Email cannot be empty")
  } else if String.length(email) > 254 {
    Some("Email address too long")
  } else if Js.String2.includes("..", email) {
    Some("Invalid email format: consecutive dots")
  } else if Js.String2.startsWith(".", email) || Js.String2.endsWith(".", email) {
    Some("Invalid email format: cannot start or end with dot")
  } else if !Js.Re.test_(emailRegex, email) {
    Some("Invalid email format")
  } else {
    // Check for suspicious patterns that might indicate injection attempts
    let suspiciousPatterns = [
      "<script",
      "javascript:",
      "data:",
      "vbscript:",
      "onload=",
      "onerror=",
      "../",
      "\\",
      "|",
      "`",
      "$",
      "!",
      "'",
      "\"",
      "(",
      ")",
      "{",
      "}",
      "[",
      "]",
    ]
    let hasSuspiciousPattern = Js.Array.some(
      pattern => Js.String2.includes(pattern, email),
      suspiciousPatterns,
    )
    if hasSuspiciousPattern {
      Some("Email contains potentially unsafe characters")
    } else {
      None
    }
  }
}

// HTML sanitization to prevent XSS
@genType
let escapeHtml = (unsafe: string): string => {
  unsafe
  ->Js.String2.replaceByRe(Js.Re.fromString("&"), "&")
  ->Js.String2.replaceByRe(Js.Re.fromString("<"), "<")
  ->Js.String2.replaceByRe(Js.Re.fromString(">"), ">")
  ->Js.String2.replaceByRe(Js.Re.fromString("\""), "&quot")
  ->Js.String2.replaceByRe(Js.Re.fromString("'"), "&#x27;")
  ->Js.String2.replaceByRe(Js.Re.fromString("/"), "&#x2F;")
}

// Secure URL validation with protocol restrictions
// In production, only allow HTTPS protocols for security
@genType
let secureUrlRegex = Js.Re.fromString("https://.+")

// Development URL validation (allows HTTP for local development)
@genType
let devUrlRegex = Js.Re.fromString("^https?://.+")

@genType
let isValidUrl = (url: string, ~isProduction: bool=true): option<string> => {
  let urlRegex = if isProduction {
    secureUrlRegex
  } else {
    devUrlRegex
  }

  // Additional security checks
  if url == "" {
    Some("URL cannot be empty")
  } else if String.length(url) > 2048 {
    Some("URL too long")
  } else if !Js.Re.test_(urlRegex, url) {
    if isProduction {
      Some("Invalid URL format. Only HTTPS URLs are allowed in production.")
    } else {
      Some("Invalid URL format")
    }
  } else {
    // Block dangerous protocols and patterns
    let dangerousPatterns = [
      "javascript:",
      "data:",
      "vbscript:",
      "file:",
      "ftp:",
      "../",
      "..\\",
      "%2e%2e",
      "\\x2e\\x2e",
      "<!--",
      "-->",
      "<script",
      "onload=",
      "onerror=",
      "onclick=",
    ]
    let hasDangerousPattern = Js.Array.some(
      pattern => Js.String2.includes(pattern, url),
      dangerousPatterns,
    )
    if hasDangerousPattern {
      Some("URL contains potentially unsafe content")
    } else {
      None
    }
  }
}

// Phone number validation (basic)
@genType
let phoneRegex = Js.Re.fromString("^[0-9+\\-\\s()]+$")

@genType
let isValidPhone = (phone: string): option<string> => {
  if !Js.Re.test_(phoneRegex, phone) {
    Some("Invalid phone number format")
  } else {
    None
  }
}

@genType
let validateAll = (validations: array<option<string>>): array<string> => {
  validations->Array.filterMap(x => x)
}
