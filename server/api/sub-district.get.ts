
import { JSONPath } from 'jsonpath-plus'
import { data, metadata } from '@/data/sub-district.json';
import { BaseDataReference, GeneralResponse, LevelData } from '@/types/response.types';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const base = query.base as BaseDataReference ?? 'BPS';
  const propertyPathRef = base == 'BPS' ? 'district_code_bps' : 'district_code_dagri';
  const path = query.district_code ? `$[?(@.${propertyPathRef} === "${query.district_code}" )]` : `$.*`;

  const result = JSONPath({ path, json: data });

  const response: GeneralResponse<typeof data> = {
    version: 'v0.0.1-BETA',
    timestamp: Date.now(),
    data: result,
    metadata: {
      currentBase: base,
      baseReferenceAvailable: metadata.baseReferenceAvailable as BaseDataReference[],
      lastSyncYear: metadata.latestUpdate,
      totalData: metadata.total,
      totalSubDistrict: result.length && result[0].sub_district.length,
      info: 'Direkomendasikan menggunakan base data BPS',
      level: metadata.level as LevelData
    }
  }

  return response;
})