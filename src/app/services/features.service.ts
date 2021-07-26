import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Feature } from '../models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
    constructor(private httpClient: HttpClient) {

    }

    getFeatures(): Observable<Feature[]> {
        return this.httpClient.get<Feature[]>(`${env.featureAPIURL}/api/v1/features/admin/list`);
    }

    addFeature(feature: Feature) {
        return this.httpClient.post<Feature[]>(`${env.featureAPIURL}/api/v1/features/admin/create`, feature);
    }

    archiveFeature(id: string) {
        return this.httpClient.put(`${env.featureAPIURL}/api/v1/features/admin/archive/${id}`, {});
    }

    updateFeature(feature: Feature) {
        return this.httpClient.put(`${env.featureAPIURL}/api/v1/features/admin/update/${feature.id}`, feature);
    }
}
