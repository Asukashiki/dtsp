export default {
  // Breeding Seed Certification Application Module
  breedingCertification: {
    title: 'Breeding Seed Certification Application',
    subtitle: 'Manage breeding seed certification applications, variety information, trial data, and regulatory information',
    list: 'Certification Application List',
    add: 'Add Certification Application',
    edit: 'Edit Certification Application',
    detail: 'Certification Application Details',
    delete: 'Delete Certification Application',
    deleteConfirm: 'Are you sure you want to delete this certification application?',
    deleteSuccess: 'Deleted successfully',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',
    varietyName: 'Variety Name',

    // Search and Filter
    searchPlaceholder: 'Search applicant organization, variety name',
    filterByCrop: 'Filter by crop type',
    filterByStatus: 'Filter by record status',

    // Table Columns
    columns: {
      applyOrgName: 'Applicant Organization',
      cropType: 'Crop Type',
      varietyName: 'Variety Name',
      recordDate: 'Record Date',
      recordStatus: 'Record Status',
      approvalNumber: 'Approval Number',
      approvalOrganization: 'Approval Organization',
      createTime: 'Create Time',
      actions: 'Actions',
    },

    // Record Status
    recordStatus: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      draft: 'Draft',
    },

    // Form - Certification Application Information
    form: {
      certificationInfo: 'Certification Application Information',
      varietyInfo: 'Variety Information',
      technicalTrait: 'Technical Trait Information',
      trialPerformance: 'Trial and Performance Information',
      supervision: 'Supervision Information',

      // Certification Application
      breedingBatchId: 'Breeding Batch ID',
      authId: 'Authentication ID',
      applyOrgName: 'Applicant Organization Name',
      applyOrgId: 'Applicant Organization ID',
      recordDate: 'Record Date',
      cropType: 'Crop Type',
      varietyName: 'Variety Name',
      recordStatus: 'Record Status',

      // Variety Information
      varietyCode: 'Variety Code',
      species: 'Species',
      genus: 'Genus',
      family: 'Family',
      breedingMethod: 'Breeding Method',
      pedigree: 'Pedigree',
      breedingYear: 'Breeding Year',

      // Technical Trait
      minYieldPotential: 'Min Yield Potential',
      maxYieldPotential: 'Max Yield Potential',
      diseaseResistance: 'Disease Resistance',
      stressResistance: 'Stress Resistance',
      maturityPeriod: 'Maturity Period (Days)',
      plantHeight: 'Plant Height (CM)',
      grainQualityTrait: 'Grain Quality Trait',

      // Trial Performance
      trialLocation: 'Trial Location',
      trialYear: 'Trial Year',
      averageYield: 'Average Yield',
      stabilityScore: 'Stability Score',
      trialReport: 'Trial Report',
      photo: 'Photo',

      // Supervision
      approvalNumber: 'Approval Number',
      approvalOrganization: 'Approval Organization',
      approvalDate: 'Approval Date',
      certificationDocument: 'Certification Document',
    },

    // Form Placeholders
    placeholder: {
      breedingBatchId: 'Enter breeding batch ID',
      authId: 'Enter authentication ID',
      applyOrgName: 'Enter applicant organization name',
      applyOrgId: 'Enter applicant organization ID',
      recordDate: 'Select record date',
      cropType: 'Select crop type',
      varietyName: 'Enter variety name',
      recordStatus: 'Select record status',

      varietyCode: 'Enter variety code',
      species: 'Enter species',
      genus: 'Enter genus',
      family: 'Enter family',
      breedingMethod: 'Select breeding method',
      pedigree: 'Enter pedigree',
      breedingYear: 'Enter breeding year',

      minYieldPotential: 'Enter minimum yield potential',
      maxYieldPotential: 'Enter maximum yield potential',
      diseaseResistance: 'Enter disease resistance',
      stressResistance: 'Enter stress resistance',
      maturityPeriod: 'Enter maturity period in days',
      plantHeight: 'Enter plant height (CM)',
      grainQualityTrait: 'Enter grain quality trait',

      trialLocation: 'Enter trial location',
      trialYear: 'Enter trial year',
      averageYield: 'Enter average yield',
      stabilityScore: 'Enter stability score',
      trialReport: 'Upload trial report',
      photo: 'Upload photo',

      approvalNumber: 'Enter approval number',
      approvalOrganization: 'Enter approval organization',
      approvalDate: 'Select approval date',
      certificationDocument: 'Upload certification document',
    },

    // Form Validation
    rules: {
      authIdRequired: 'Authentication ID is required',
      cropTypeRequired: 'Crop type is required',
      varietyNameRequired: 'Variety name is required',
      recordStatusRequired: 'Record status is required',

      varietyCodeRequired: 'Variety code is required',
      speciesRequired: 'Species is required',
      genusRequired: 'Genus is required',
      familyRequired: 'Family is required',
      breedingMethodRequired: 'Breeding method is required',
      pedigreeRequired: 'Pedigree is required',
      breedingYearRequired: 'Breeding year is required',

      minYieldPotentialRequired: 'Minimum yield potential is required',
      maxYieldPotentialRequired: 'Maximum yield potential is required',
      diseaseResistanceRequired: 'Disease resistance is required',
      stressResistanceRequired: 'Stress resistance is required',
      maturityPeriodRequired: 'Maturity period is required',
      plantHeightRequired: 'Plant height is required',
      grainQualityTraitRequired: 'Grain quality trait is required',

      trialLocationRequired: 'Trial location is required',
      trialYearRequired: 'Trial year is required',
      averageYieldRequired: 'Average yield is required',
      stabilityScoreRequired: 'Stability score is required',
      trialReportRequired: 'Trial report is required',
      photoRequired: 'Photo is required',

      approvalNumberRequired: 'Approval number is required',
      approvalOrganizationRequired: 'Approval organization is required',
      approvalDateRequired: 'Approval date is required',
      certificationDocumentRequired: 'Certification document is required',
    },

    // Crop Types
    cropTypes: {
      wheat: 'Wheat',
      rice: 'Rice',
      corn: 'Corn',
      soybean: 'Soybean',
      cotton: 'Cotton',
      other: 'Other',
    },

    // Breeding Methods
    breedingMethods: {
      hybridization: 'Hybridization',
      mutation: 'Mutation Breeding',
      selection: 'Selection Breeding',
      biotechnology: 'Biotechnology Breeding',
      other: 'Other',
    },

    // Audit Related
    submit: 'Submit for Audit',
    submitForAudit: 'Submit for Audit',
    submitSuccess: 'Submitted successfully',
    auditResult: 'Audit Result',
    auditComment: 'Audit Comment',
    auditTime: 'Audit Time',
    auditor: 'Auditor',
    auditorOrg: 'Audit Organization',
    approve: 'Approve',
    reject: 'Reject',
    auditSuccess: 'Audit completed successfully',
    auditDialog: 'Audit',
    auditCommentPlaceholder: 'Please enter audit comment',
    auditCommentRequired: 'Audit comment is required',

    // Print Related
    print: 'Print',
    printCount: 'Print Count',
    lastPrintTime: 'Last Print Time',
    certificateLabel: 'Seed Certification Label',
    printSuccess: 'Print logged successfully',
    printInfo: 'Print Information',
  },

  // Breeding Seed Audit
  breedingAudit: {
    title: 'Breeding Seed Audit',
    subtitle: 'Review pending breeding seed certification applications',
    list: 'Audit List',
    pendingOnly: 'Show pending applications only',
    auditInfo: 'Audit Information',
    audit: 'Audit',
    noData: 'No pending applications',
  },

  // Breeding Seed Certificate
  breedingCertificate: {
    title: 'Seed Certificate Issuance',
    subtitle: 'Manage approved seed certification certificates',
    list: 'Certificate List',
    approvedOnly: 'Show approved certifications only',
    viewCertificate: 'View Certificate',
    printCertificate: 'Print Certificate',
    certificateInfo: 'Certificate Information',
  },
}
