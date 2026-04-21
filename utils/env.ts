export function isEnvEnabled(value?: string | number | boolean) {
  if (value === undefined || value === null)
    return false

  const normalized = String(value).trim().toLowerCase()
  if (!normalized)
    return false

  return !['0', 'false', 'no', 'off'].includes(normalized)
}
