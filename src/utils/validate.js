export function validateRequire(val) {
  if (val || val === 0 || val === '0') {
    return true
  } else {
    return false
  }
}

// 正整数
export function validateInteger(val) {
  if (val ) {
    if (!(/(^[0-9]\d*$)/.test(val))) {
      return false;
    } else {
      if (Number(val) === 0 ) {
        return false
      }
      return true
    } 
  } else {
    return false
  }
}

// 正两位小数 或 0
export function validateFloat(val) {
  if (val === 0 || val === '0') {
    return true
  }
  if (!Number(val)) {
    return false
  }
  let a = /^\d+(\.\d{1,2})?$/.test(val)
  return a
}

export function validateStringLen(val, len) {
  if (val.length <= len && val) {
    return true
  } else {
    return false
  }
}