import { Entity } from "src/modules/shared/core/domain/entity.abstract";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";

export interface IAnswerOptionEntityProps
  extends Pick<AnswerOptionEntity, "id" | "questionId" | "description"> {}

export interface IAnswerOptionEntityCreationProps
  extends Omit<IAnswerOptionEntityProps, "id"> {}

export interface IAnswerOptionEntityUpdateProps
  extends Partial<Omit<IAnswerOptionEntityProps, "id" | "questionId">> {}

export interface IPrimitiveAnswerOptionEntity {
  id: string;
  questionId: string;
  description: string;
}

export class AnswerOptionEntity extends Entity<UUIDValueObject> {
  private _questionId: UUIDValueObject;
  private _description: StringValueObject;

  constructor(props: IAnswerOptionEntityProps) {
    super(props.id);
    this._questionId = props.questionId;
    this._description = props.description;
  }

  static create(props: IAnswerOptionEntityCreationProps): AnswerOptionEntity {
    return new AnswerOptionEntity({
      ...props,
      id: new UUIDValueObject(crypto.randomUUID()),
    });
  }

  static fromPrimitive(
    props: IPrimitiveAnswerOptionEntity,
  ): AnswerOptionEntity {
    const { id, questionId, description } = props;
    return new AnswerOptionEntity({
      id: new UUIDValueObject(id),
      questionId: new UUIDValueObject(questionId),
      description: new StringValueObject(description),
    });
  }

  toPrimitive(): IPrimitiveAnswerOptionEntity {
    return this.getPrimitiveEntity();
  }

  // TODO: Improve the question update logic
  update(answerOptionUpdateProps: IAnswerOptionEntityUpdateProps): void {
    Object.assign(this, answerOptionUpdateProps);
  }

  get questionId(): UUIDValueObject {
    return this._questionId;
  }

  private set questionId(questionId: UUIDValueObject) {
    this._questionId = questionId;
  }

  get description(): StringValueObject {
    return this._description;
  }

  private set description(description: StringValueObject) {
    this._description = description;
  }
}
