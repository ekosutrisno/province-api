export interface GeneralResponse<T> {
    version: string;
    timestamp: number;
    data: T;
    metadata: MetaData
}


export interface MetaData {
    totalData: number;
    totalDistrict?: number;
    totalSubDistrict?: number;
    lastSyncYear: number;
    currentBase: BaseDataReference;
    baseReferenceAvailable: BaseDataReference[];
    info: string;
    level: LevelData;
}

export type BaseDataReference = 'BPS' | 'KEMENDAGRI';
export type LevelData = 'PROVINCE' | 'DISTRICT' | 'SUB_DISTRICT' | 'VILLAGE';