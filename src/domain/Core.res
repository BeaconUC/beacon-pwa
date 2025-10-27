@genType
module Validation = {
  type result<'a> =
    | Valid('a)
    | Invalid(array<string>)

  let map = (fn, validation) => {
    switch validation {
    | Valid(value) => Valid(fn(value))
    | Invalid(errors) => Invalid(errors)
    }
  }

  let bind = (validation, fn) => {
    switch validation {
    | Valid(value) => fn(value)
    | Invalid(errors) => Invalid(errors)
    }
  }
}

@genType
module Uuid = {
  type t = string

  let create = (value: string): Validation.result<t> => {
    let uuidRegex = Js.Re.fromString("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")
    if Js.Re.test_(uuidRegex, Js.String2.toLowerCase(value)) {
      Valid(value)
    } else {
      Invalid(["Invalid UUID format"])
    }
  }
}

@genType
module Timestamp = {
  type t = Js.Date.t

  let create = (date: Js.Date.t): Validation.result<t> => {
    let now = Js.Date.now()
    let inputTime = Js.Date.getTime(date)
    
    if inputTime > now {
      Invalid(["Timestamp cannot be in the future"])
    } else if inputTime < (now -. (365.0 *. 24.0 *. 60.0 *. 60.0 *. 1000.0)) { // More than 1 year ago
      Invalid(["Timestamp is too far in the past"])
    } else {
      Valid(date)
    }
  }
}

@genType
module Coordinates = {
  type t = {
    latitude: float,
    longitude: float
  }

  let create = (~latitude, ~longitude): Validation.result<t> => {
    let coords = {latitude, longitude}
    if coords.latitude >= -90.0 && coords.latitude <= 90.0 &&
       coords.longitude >= -180.0 && coords.longitude <= 180.0 {
      Valid(coords)
    } else {
      Invalid(["Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180"])
    }
  }

  @genType
  let isValid = (coords: t): bool => {
    switch create(~latitude=coords.latitude, ~longitude=coords.longitude) {
    | Valid(_) => true
    | Invalid(_) => false
    }
  }

  // Safe conversion from existing record
  @genType
  let fromRecord = (record: t): Validation.result<t> => {
    create(~latitude=record.latitude, ~longitude=record.longitude)
  }
}

module Location = {
  @genType
  type t = {
    coordinates: Coordinates.t,
    address: option<string>,
    barangay: string,
    city: string,
    province: string
  }

  // Smart constructor with comprehensive validation
  @genType
  let create = (
    ~coordinates,
    ~address=?,
    ~barangay,
    ~city,
    ~province
  ): Validation.result<t> => {
    // Validate coordinates first
    switch Coordinates.fromRecord(coordinates) {
    | Invalid(errors) => Invalid(errors)
    | Valid(validCoords) =>
      // Validate required string fields using ValidationUtils
      let validations = [
        ValidationUtils.isNotEmpty(barangay, "Barangay"),
        ValidationUtils.isNotEmpty(city, "City"),
        ValidationUtils.isNotEmpty(province, "Province"),
        ValidationUtils.hasMinLength(barangay, 2, "Barangay"),
        ValidationUtils.hasMinLength(city, 2, "City"),
        ValidationUtils.hasMinLength(province, 2, "Province")
      ]
      
      let errors = ValidationUtils.validateAll(validations)
      if Array.length(errors) > 0 {
        Invalid(errors)
      } else {
        Valid({
          coordinates: validCoords,
          address,
          barangay,
          city,
          province
        })
      }
    }
  }

  // Safe conversion from existing record
  @genType
  let fromRecord = (record: t): Validation.result<t> => {
    create(
      ~coordinates=record.coordinates,
      ~address=Option.getOr(record.address, ""),
      ~barangay=record.barangay,
      ~city=record.city,
      ~province=record.province
    )
  }
}

@genType
module Percentage = {
  type t = float

  let create = (value: float): Validation.result<t> => {
    if value >= 0.0 && value <= 100.0 {
      Valid(value)
    } else {
      Invalid(["Percentage must be between 0 and 100"])
    }
  }

  let toDecimal = (percentage: t): float => {
    percentage /. 100.0
  }

  let fromDecimal = (decimal: float): Validation.result<t> => {
    create(decimal *. 100.0)
  }

  let clamp = (value: float): t => {
    value->Js.Math.max_float(0.0)->Js.Math.min_float(100.0)
  }
}
