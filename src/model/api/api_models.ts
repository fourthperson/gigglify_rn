export interface Joke {
    error:    boolean;
    category: string;
    type:     string;
    joke:    string;
    setup:    string;
    delivery: string;
    flags:    Flags;
    id:       number;
    safe:     boolean;
    lang:     string;
}

export interface Flags {
    nsfw:      boolean;
    religious: boolean;
    political: boolean;
    racist:    boolean;
    sexist:    boolean;
    explicit:  boolean;
}

export class JokeConvert {
	public static toJoke(json: string): Joke {
		return JSON.parse(json);
	}

	public static jokeToJson(value: Joke): string {
		return JSON.stringify(value);
	}
}