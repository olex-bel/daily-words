
import supabase from "../../../services/supabase";

export const MAX_DAILY_WORDS = 5;

type ItemType = 'word' | 'idiom' | 'phrasal_verb';
type VerbAspect = 'pf' | 'impf';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'idiom'        
  | 'phrase'
  | 'expression';

type WordMeaning = {
    val: string;
    context: string;
};
type WordGender = 'm' | 'f' | 'n';
type GrammaticalCase = 'nom' | 'gen' | 'dat' | 'acc' | 'loc' | 'ins';
type CaseRelation = {
    case: GrammaticalCase;
    marker: string;
};
type WordRating = 'safe' | 'slang' | 'vulgar';

export type GrammarDetails = 
  | {
      pos: 'noun';
      gender: WordGender;
      plural?: string;
      genitive?: string;
    }
  | {
      pos: 'verb';
      aspect: VerbAspect;
    }
  | {
      pos: 'adj' | 'adv';
      comparative?: string;
    }
  | {
      pos: 'prep' | 'phrasal_verb';
      cases: CaseRelation[];
    }
  | {
      pos: 'phrase' | 'idiom';
    };


export type WordEntry = {
    id: number;
    content: string;
    type: ItemType;
    meanings: WordMeaning[];
    grammar: GrammarDetails;
    rating: WordRating;
    stage: number;
    example: string;
};

export async function get_daily_words(number_of_words: number) {
    const { data, error } = await supabase.rpc('get_daily_words', { 'target_limit': number_of_words });

    if (error) {
        throw new Error(error.message);
    }

    return data as WordEntry[];
}
