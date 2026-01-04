
import Flashcard from "~/components/Flashcard";

export default function Learning() {
    const data = {
        word: "žena",
        example: "Tá žena je moja sestra.",
        grammar: {
            partsOfSpeech: "noun", 
            gender: "feminine",
            genitive: "-y",
            plural: "-y"
        },
        translation: "жінка",
    };

    return (
        <div className="h-full flex justify-center items-center">
            <Flashcard data={data} />
        </div>
    );
}
