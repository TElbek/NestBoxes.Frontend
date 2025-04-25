export const getRepairClass = (repairLevel) => {
    if(repairLevel == 1) return 'small-repair';
    if(repairLevel == 2) return 'large-repair';
    if(repairLevel == 3) return 'replace-repair';
}