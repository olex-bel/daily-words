
import supabase from "./supabase";

export const MAX_DAILY_ENTRIES = 5;

export type ItemType = 'word' | 'idiom' | 'phrasal_verb';

type VerbAspect = 'pf' | 'impf';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'idiom'        
  | 'phrase'
  | 'expression';

export type EntryMeaning = {
    val: string;
    context: string;
};
type EntryGender = 'm' | 'f' | 'n';
type GrammaticalCase = 'nom' | 'gen' | 'dat' | 'acc' | 'loc' | 'ins';
type CaseRelation = {
    case: GrammaticalCase;
    marker: string;
};
type EntryRating = 'safe' | 'slang' | 'vulgar';

export type GrammarDetails = 
  | {
      pos: 'noun';
      gender: EntryGender;
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

export type RecentEntry = {
    id: number;
    content: string;
    created_at: Date | null;
}

export type Entry = {
    id: number;
    content: string;
    type: ItemType;
    meanings: EntryMeaning[];
    grammar: GrammarDetails;
    rating: EntryRating;
    stage: number;
    example: string;
    audio_url: string | null;
};

export type ReviewRating = 'unknown' | 'hard' | 'know';

export async function getDailyEntries(number_of_words: number) {
    const { data, error } = await supabase.rpc('get_daily_entries', { 'target_limit': number_of_words });

    if (error) {
        throw new Error(error.message);
    }

    return (data as any[] ?? []).map((entry) => {
        const audio_url = entry.audio_path
            ? supabase.storage
                .from('audio')
                .getPublicUrl(`public/${entry.audio_path}`).data.publicUrl
            : null;

        return {
            ...entry,
            audio_url,
        };
    });
}

export async function getDifficultEntries(): Promise<Entry[]> {
    const { data, error } = await supabase.rpc('get_difficult_entries');

    if (error) {
        console.error('Error fetching difficult entries:', error);
        return [];
    }

    return (data as any[] ?? []).map((entry) => {
        const audio_url = entry.audio_path
            ? supabase.storage
                .from('audio')
                .getPublicUrl(`public/${entry.audio_path}`).data.publicUrl
            : null;

        return {
            ...entry,
            audio_url,
        };
    });
}

export async function updateCardReview(id: number, rating: ReviewRating) {
    const { error } = await supabase.rpc('update_card_review', { 'p_entry_id': id, 'p_rating': rating });

    if (error) {
        console.error('Error update entre rating:', error);
        throw error;
    }
}
