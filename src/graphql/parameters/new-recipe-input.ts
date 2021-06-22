import { ArrayMaxSize, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class NewRecipeInput {
    @Field()
    @MaxLength(30)
    title: string;

    @Field({ nullable: true })
    @Length(30, 255)
    description?: string;

    @Field(type => [String])
    @ArrayMaxSize(30)
    ingredients: string[];
}

export default NewRecipeInput;