import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../Config';

@Injectable()
export class ConfigService {

  constructor(public http: HttpClient) { }
  configUrl = Config.dbURL;

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
