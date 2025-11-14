import { SessionService } from './token.service';

export function appInitFactory(session: SessionService) {
  return () =>
    session
      .create()
      .toPromise()
      .catch(() => void 0);
}
