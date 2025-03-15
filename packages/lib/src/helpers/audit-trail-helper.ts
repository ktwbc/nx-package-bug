import { DynamoAuditTrail } from '../db/DynamoAuditTrail';
import { AuditTrailEvent } from '../interfaces/AuditTrailEvent';

export const writeAudit = (
  eventObject: any,
  user: string,
  event: AuditTrailEvent,
  token?: string,
  data?: object
): Promise<any> => {
  // console.log('writeAudit', { user, event, token, data });
  let params = {
    data: data ? JSON.parse(JSON.stringify(data)) : undefined,
    event,
    ip_address:
      eventObject?.requestContext?.identity?.sourceIp ||
      eventObject?.requestContext?.http?.sourceIp,
    token,
    user
  };
  if (!params.token || params.token === '') {
    Reflect.deleteProperty(params, 'token');
  }
  if (!params.data) {
    Reflect.deleteProperty(params, 'data');
  }
  console.log('writeAudit params', { params });
  const item = DynamoAuditTrail.new(params);
  return item.save();
};
