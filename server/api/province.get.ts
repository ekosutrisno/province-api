
import { JSONPath } from 'jsonpath-plus'
import { data, metadata } from '../data/province.json';
import { BaseDataReference, GeneralResponse, LevelData } from '../../types/response.types';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const base = query.base as BaseDataReference ?? 'BPS';
  const propertyPathRef = base == 'BPS' ? 'kode_bps' : 'kode_dagri';
  const path = query.code ? `$[?(@.${propertyPathRef} === "${query.code}" )]` : `$.*`;

  const response: GeneralResponse<typeof data> = {
    version: 'v0.0.1-BETA',
    timestamp: Date.now(),
    data: JSONPath({ path, json: data }),
    metadata: {
      currentBase: base,
      baseReferenceAvailable: metadata.baseReferenceAvailable as BaseDataReference[],
      lastSyncYear: metadata.latestUpdate,
      totalData: metadata.total,
      info: 'Direkomendasikan menggunakan base data BPS',
      level: metadata.level as LevelData
    }
  }

  return response;
})