import { environment } from './../../../environments/environment';

export class AppConfig {
  public static getAPIURI(): string {
    return environment.apiUrl;
  }
}
