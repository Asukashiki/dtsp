// 种子推广信息管理国际化文件
export default {
  title: 'Seed Promotion Management',
  subtitle: 'Manage seed variety promotion content, upload promotional videos, generate sharing links',

  // Buttons and Actions
  uploadContent: 'Upload Promotion Content',
  generateLink: 'Generate Share Link',
  copyLink: 'Copy Link',
  shareLink: 'Share Link',
  shareTip: 'You can share this link with customers to let them know more about your varieties',
  linkCopied: 'Link copied to clipboard',

  // Search and Filter
  searchPlaceholder: 'Search promotion title',
  filterByStatus: 'Filter by status',
  allStatus: 'All Status',

  // Status
  status: {
    active: 'Active',
    expired: 'Expired',
  },

  // List Columns
  columns: {
    promotionId: 'Promotion ID',
    title: 'Title',
    recommendedVarieties: 'Recommended Varieties',
    publishTime: 'Publish Time',
    validPeriod: 'Valid Period',
    visitCount: 'Visits',
    shareLink: 'Share Link',
    actions: 'Actions',
  },

  // Form Fields
  form: {
    enterpriseId: 'Enterprise ID',
    title: 'Title',
    videoFile: 'Promotional Video',
    promotionSummary: 'Promotion Summary',
    recommendedVarieties: 'Recommended Varieties',
    validPeriod: 'Valid Period',
    selectVideo: 'Select Video File',
    videoTips: 'Only MP4 format supported, file size ≤ 100MB',
    varietiesTips: 'Separate multiple varieties with commas',
  },

  // Form Placeholders
  placeholder: {
    title: 'Please enter promotion title',
    promotionSummary: 'Please enter promotion summary (optional)',
    recommendedVarieties: 'Please enter recommended varieties, separated by commas',
    validPeriod: 'Please enter valid period in days',
  },

  // Form Validation
  rules: {
    titleRequired: 'Please enter promotion title',
    videoRequired: 'Please upload promotional video',
    varietiesRequired: 'Please enter recommended varieties',
    validPeriodRequired: 'Please enter valid period',
    validPeriodFormat: 'Valid period must be a positive integer',
  },

  // Messages
  messages: {
    uploadSuccess: 'Promotion content uploaded successfully',
    uploadFailed: 'Failed to upload promotion content',
    deleteConfirm: 'Are you sure to delete this promotion content?',
    deleteSuccess: 'Deleted successfully',
    deleteFailed: 'Failed to delete',
    loadFailed: 'Failed to load promotion content',
    videoSizeExceeded: 'Video file size cannot exceed 100MB',
    videoFormatError: 'Only MP4 format video files are allowed',
  },

  // Detail Page
  detail: {
    title: 'Promotion Detail',
    basicInfo: 'Basic Information',
    videoPreview: 'Video Preview',
    statistics: 'Statistics',
    relatedVarieties: 'Related Varieties',
    noVideo: 'No video available',
    viewVarietyDetail: 'View Variety Detail',
  },

  // Card Display (Mobile)
  card: {
    validUntil: 'Valid Until',
    views: 'Views',
    times: 'Times',
  },
}