import { Dyngoose } from 'dyngoose';
import { DateTime } from 'luxon';

import { AuditTrailEvent } from '../interfaces/AuditTrailEvent';

@Dyngoose.$Table({ name: 'test-audit-trail' })
export class DynamoAuditTrail extends Dyngoose.Table {
  @Dyngoose.$PrimaryKey('user', 'created_at')
  public static readonly primaryKey: Dyngoose.Query.PrimaryKey<DynamoAuditTrail, string, number>;

  @Dyngoose.$GlobalSecondaryIndex({
    hashKey: 'token',
    rangeKey: 'created_at',
    name: 'token-created'
  })
  public static readonly tokenCreated: Dyngoose.Query.GlobalSecondaryIndex<DynamoAuditTrail>;

  @Dyngoose.$GlobalSecondaryIndex({
    hashKey: 'event',
    rangeKey: 'created_at',
    name: 'event-created'
  })
  public static readonly eventCreated: Dyngoose.Query.GlobalSecondaryIndex<DynamoAuditTrail>;

  @Dyngoose.$GlobalSecondaryIndex({
    hashKey: 'user',
    rangeKey: 'created_at',
    name: 'user-created'
  })
  public static readonly byUser: Dyngoose.Query.GlobalSecondaryIndex<DynamoAuditTrail>;

  @Dyngoose.$DocumentClient()
  public static readonly documentClient: Dyngoose.DocumentClient<DynamoAuditTrail>;

  @Dyngoose.Attribute.String()
  user: string;

  @Dyngoose.Attribute.String()
  token: string;

  @Dyngoose.Attribute.String()
  day: string;

  @Dyngoose.Attribute.String()
  ip_address: string;

  @Dyngoose.Attribute.String()
  event: AuditTrailEvent;

  @Dyngoose.Attribute()
  data: object;

  @Dyngoose.Attribute.Number()
  created_at: number;

  @Dyngoose.Attribute.Number()
  updated_at: number;

  async beforeSave() {
    this.created_at = DateTime.now().toMillis();
    this.updated_at = this.created_at;
    this.day = DateTime.now().setZone('America/Chicago').toISO() as string;
    return true;
  }
}
