export default {
    title: 'Identity Verification',
    subtitle: 'Select verification type',
    description: 'Complete identity verification to access corresponding system functions',

    farmer: 'Farmer Verification',
    supplier: 'Supplier Verification',
    buyer: 'Buyer Verification',

    farmerTitle: 'Farmer Verification Application',
    farmerDesc: 'Identity verification for individual farmers to access related services',
    farmerSubtitle: 'Please fill in the following information to complete farmer identity verification',

    supplierTitle: 'Supplier Verification Application',
    supplierDesc: 'Identity verification for suppliers to access supply-side business',
    supplierSubtitle: 'Please fill in the following information to complete supplier verification',

    buyerTitle: 'Buyer Verification Application',
    buyerDesc: 'Identity verification for buyers to facilitate transactions and collaboration',
    buyerSubtitle: 'Please fill in the following information to complete buyer verification',

    applyNow: 'Apply Now',
    viewStatus: 'View Status',
    goApply: 'Apply',

    status: {
      notCertified: 'Not Certified',
      underReview: 'Under Review',
      certified: 'Certified',
      rejected: 'Rejected',
    },

    form: {
      // Common fields
      name: 'Full Name',
      idNo: 'ID Number',
      mobile: 'Phone Number',
      region: 'Region',
      address: 'Detailed Address',
      remark: 'Remarks',
      contactName: 'Contact Name',
      contactMobile: 'Contact Phone',

      // Farmer fields
      cropTypes: 'Crop Types',
      attachments: 'Supporting Documents',

      // Supplier/Buyer fields
      entityType: 'Entity Type',
      entityName: 'Name',
      uscc: 'Unified Social Credit Code',
      legalPerson: 'Legal Representative',
      legalIdNo: 'Legal Representative ID',
      scope: 'Business Scope/Main Products',
      license: 'Business License',
      principalName: 'Principal Name',
      principalIdNo: 'Principal ID Number',
      productTypes: 'Main Procurement Product Types',

      // Review fields
      auditOpinion: 'Review Comments',
      auditResult: 'Review Result',
      pass: 'Approve',
      reject: 'Reject',
    },

    placeholder: {
      name: 'Please enter full name',
      idNo: 'Please enter ID number',
      mobile: 'Please enter phone number',
      region: 'Please select region',
      address: 'Please enter detailed address',
      remark: 'Remarks (optional)',
      cropTypes: 'Please select crop types',
      entityName: 'Please enter entity name',
      uscc: 'Please enter Unified Social Credit Code (18 digits)',
      legalPerson: 'Please enter legal representative',
      legalIdNo: 'Please enter ID number',
      scope: 'Please enter business scope or main products',
      contactName: 'Please enter contact name',
      contactMobile: 'Please enter contact phone',
      principalName: 'Please enter principal name',
      principalIdNo: 'Please enter principal ID number',
      productTypes: 'Please select product types',
      auditOpinion: 'Please enter review comments',
    },

    uploadTip: 'Supports jpg/png/pdf, up to {count} files',
  }