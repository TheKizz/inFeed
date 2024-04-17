import { BooleanValueObject } from "src/modules/shared/core/domain/boolean.value-object";
import {
  Entity,
  type PrimitiveEntity,
} from "src/modules/shared/core/domain/entity.abstract";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import {
  SurveyParticipationConditionValueObject,
  type SurveyParticipationCondition,
} from "../value-objects/survey-participation-condition.value-object";
import { NumericValueObject } from "src/modules/shared/core/domain/numeric.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export interface ISurveyEntityProps
  extends Pick<
      SurveyEntity,
      | "id"
      | "title"
      | "description"
      | "isPublic"
      | "participationCondition"
      | "forceToRate"
      | "rating"
      | "startsAt"
      | "creatorId"
    >,
    Partial<Pick<SurveyEntity, "endsAt">> {}

export interface ISurveyEntityCreationProps
  extends Pick<
    ISurveyEntityProps,
    | "title"
    | "description"
    | "isPublic"
    | "participationCondition"
    | "forceToRate"
    | "startsAt"
    | "endsAt"
    | "creatorId"
  > {}

export interface IPrimitiveSurveyEntity extends PrimitiveEntity<string> {
  title: string;
  description: string;
  isPublic: boolean;
  participationCondition: SurveyParticipationCondition;
  forceToRate: boolean;
  rating: number;
  startsAt: Date;
  endsAt?: Date;
  creatorId: string;
}

export class SurveyEntity extends Entity<UUIDValueObject> {
  private _title: StringValueObject;
  private _description: StringValueObject;
  private _isPublic: BooleanValueObject;
  private _participationCondition: SurveyParticipationConditionValueObject;
  private _forceToRate: BooleanValueObject;
  private _rating: NumericValueObject;
  private _startsAt: Date;
  private _endsAt?: Date;
  private _creatorId: StringValueObject;

  constructor(props: ISurveyEntityProps) {
    const {
      id,
      title,
      description,
      isPublic,
      participationCondition,
      forceToRate,
      rating,
      startsAt,
      endsAt,
      creatorId,
    } = props;
    super(id);
    this._title = title;
    this._description = description;
    this._isPublic = isPublic;
    this._participationCondition = participationCondition;
    this._forceToRate = forceToRate;
    this._rating = rating;
    this._startsAt = startsAt;
    this._endsAt = endsAt;
    this._creatorId = creatorId;
  }

  static create(props: ISurveyEntityCreationProps): SurveyEntity {
    return new SurveyEntity({
      ...props,
      id: new UUIDValueObject(crypto.randomUUID()),
      rating: new NumericValueObject(0),
    });
  }

  static fromPrimitive(props: IPrimitiveSurveyEntity): SurveyEntity {
    const {
      id,
      title,
      description,
      isPublic,
      participationCondition,
      forceToRate,
      rating,
      startsAt,
      endsAt,
      creatorId,
    } = props;
    const surveyEntityProps: ISurveyEntityProps = {
      id: new UUIDValueObject(id),
      title: new StringValueObject(title),
      description: new StringValueObject(description),
      isPublic: new BooleanValueObject(isPublic),
      participationCondition: new SurveyParticipationConditionValueObject(
        participationCondition,
      ),
      forceToRate: new BooleanValueObject(forceToRate),
      rating: new NumericValueObject(rating),
      startsAt: new Date(startsAt),
      endsAt,
      creatorId: new StringValueObject(creatorId),
    };
    return new SurveyEntity(surveyEntityProps);
  }

  toPrimitive(): IPrimitiveSurveyEntity {
    return this.getPrimitiveEntity<IPrimitiveSurveyEntity>();
  }

  get title(): StringValueObject {
    return this._title;
  }

  get description(): StringValueObject {
    return this._description;
  }

  get isPublic(): BooleanValueObject {
    return this._isPublic;
  }

  get participationCondition(): SurveyParticipationConditionValueObject {
    return this._participationCondition;
  }

  get forceToRate(): BooleanValueObject {
    return this._forceToRate;
  }

  get rating(): NumericValueObject {
    return this._rating;
  }

  get startsAt(): Date {
    return this._startsAt;
  }

  get endsAt(): Date | undefined {
    return this._endsAt;
  }

  get creatorId(): StringValueObject {
    return this._creatorId;
  }
}
