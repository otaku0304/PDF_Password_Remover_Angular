import { environment } from './../../../environments/environment';

export class AppConfig {
  public static getAPIURI(): string {
    return environment.apiUrl;
  }

  public static getSiteURL(): string {
    return environment.siteUrl;
  }

  public static getI18nUrl(): string {
    return environment.navigateToi18n;
  }
}
