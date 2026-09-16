import { reactive } from 'vue'

const STORAGE_PREFIX = 'dtsp:table-column-widths:'
const DRAG_MIN_WIDTH = 30

const toPositiveNumber = (value, fallback) => {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : fallback
}

/**
 * Keeps user-resized Element Plus table columns in sync with the rendered
 * table and restores the widths when the page is opened again.
 */
export function useTableColumnWidths(storageKey, defaults, minimums = {}) {
  const widths = reactive({ ...defaults })
  const storageName = `${STORAGE_PREFIX}${storageKey}`

  Object.keys(defaults).forEach((columnKey) => {
    const defaultWidth = toPositiveNumber(defaults[columnKey], 120)
    const minimum = Math.max(toPositiveNumber(minimums[columnKey], 80), 80)
    widths[columnKey] = Math.max(defaultWidth, minimum)
  })

  if (typeof window !== 'undefined') {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageName) || '{}')
      Object.keys(defaults).forEach((columnKey) => {
        const defaultWidth = toPositiveNumber(defaults[columnKey], 120)
        const savedWidth = toPositiveNumber(saved[columnKey], defaultWidth)
        widths[columnKey] = Math.max(savedWidth, DRAG_MIN_WIDTH)
      })
    } catch {
      // Ignore malformed or unavailable local storage and use defaults.
    }
  }

  const persist = () => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(storageName, JSON.stringify({ ...widths }))
    } catch {
      // A private browsing session may reject local storage writes.
    }
  }

  const handleHeaderDragend = (newWidth, _oldWidth, column) => {
    const columnKey = column?.columnKey || column?.property
    if (!columnKey || !Object.prototype.hasOwnProperty.call(widths, columnKey)) return

    widths[columnKey] = Math.max(toPositiveNumber(newWidth, widths[columnKey]), DRAG_MIN_WIDTH)
    persist()
  }

  return {
    widths,
    handleHeaderDragend
  }
}
