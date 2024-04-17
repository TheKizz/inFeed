import { EnumValueObject } from "src/modules/shared/core/domain/enum.value-object";

export enum SurveyParticipationCondition {
  ALL = "ALL",
  GUEST_USERS = "GUEST_USERS",
  REGISTERED_USERS = "REGISTERED_USERS",
}

export class SurveyParticipationConditionValueObject extends EnumValueObject<string> {
  constructor(value: SurveyParticipationCondition) {
    super(Object.values(SurveyParticipationCondition), value);
  }

  static ALL = new SurveyParticipationConditionValueObject(
    SurveyParticipationCondition.ALL,
  );

  static GUEST_USERS = new SurveyParticipationConditionValueObject(
    SurveyParticipationCondition.GUEST_USERS,
  );

  static REGISTERED_USERS = new SurveyParticipationConditionValueObject(
    SurveyParticipationCondition.REGISTERED_USERS,
  );
}
