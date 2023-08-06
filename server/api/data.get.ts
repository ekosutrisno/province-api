
import { JSONPath } from 'jsonpath-plus'
import { data, metadata } from '@/data/district.json';
import { BaseDataReference, GeneralResponse, LevelData } from '@/types/response.types';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const base = query.base as BaseDataReference ?? 'BPS';
  const propertyPathRef = base == 'BPS' ? 'province_code_bps' : 'province_code_dagri';
  const path = query.province_code ? `$[?(@.${propertyPathRef} === "${query.province_code}" )]` : `$.*`;

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
      totalDistrict: result[0].districts.length,
      info: 'Direkomendasikan menggunakan base data BPS',
      level: metadata.level as LevelData
    }
  }

  response.data[0].districts.forEach((d) => {
    fetch(`https://sig.bps.go.id/rest-bridging/getwilayah?level=kecamatan&parent=${d.kode_bps}`)
      .then(res => res.json())
      .then(data => {

        const finalData = {
          district_code_bps: d.kode_bps,
          district_code_dagri: d.kode_dagri,
          data: data
        };
        console.log(finalData);
      })
  })

  return response;
})