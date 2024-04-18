import { Entity } from "src/modules/shared/core/domain/entity.abstract";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import {
  type QuestionType,
  QuestionTypeValueObject,
} from "../value-objects/question-type.value-object";

export interface IQuestionEntityProps
  extends Pick<QuestionEntity, "id" | "surveyId" | "description" | "type"> {}

export interface IQuestionEntityCreationProps
  extends Omit<IQuestionEntityProps, "id"> {}

export interface IQuestionEntityUpdateProps
  extends Partial<Omit<IQuestionEntityProps, "id" | "surveyId">> {}

export interface IPrimitiveQuestionEntity {
  id: string;
  surveyId: string;
  description: string;
  type: QuestionType;
}

export class QuestionEntity extends Entity<UUIDValueObject> {
  private _surveyId: UUIDValueObject;
  private _description: StringValueObject;
  private _type: QuestionTypeValueObject;

  constructor(props: IQuestionEntityProps) {
    super(props.id);
    this._surveyId = props.surveyId;
    this._description = props.description;
    this._type = props.type;
  }

  static create(props: IQuestionEntityCreationProps): QuestionEntity {
    return new QuestionEntity({
      ...props,
      id: new UUIDValueObject(crypto.randomUUID()),
    });
  }

  static fromPrimitive(props: IPrimitiveQuestionEntity): QuestionEntity {
    const { id, surveyId, description, type } = props;
    return new QuestionEntity({
      id: new UUIDValueObject(id),
      surveyId: new UUIDValueObject(surveyId),
      description: new StringValueObject(description),
      type: new QuestionTypeValueObject(type),
    });
  }

  toPrimitive(): IPrimitiveQuestionEntity {
    return this.getPrimitiveEntity();
  }

  // TODO: Improve the question update logic
  update(questionUpdateProps: IQuestionEntityUpdateProps): void {
    Object.assign(this, questionUpdateProps);
  }

  get surveyId(): UUIDValueObject {
    return this._surveyId;
  }

  get description(): StringValueObject {
    return this._description;
  }

  get type(): QuestionTypeValueObject {
    return this._type;
  }
}
