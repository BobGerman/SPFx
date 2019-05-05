export interface UserMention {
    Id: number;
    FullName: string;
    UserName: string;
}

export interface UserMention2 {
    Id: number;
    FullName: string;
    UserName: string;
}

export interface UserDetails {
    FullName: string;
    Location: string;
    Id: number;
    UserName: string;
    FollowersCount: number;
    Description: string;
    StatusesCount: number;
    FriendsCount: number;
    FavouritesCount: number;
    ProfileImageUrl: string;
}

export interface OriginalTweet {
    TweetText: string;
    TweetId: string;
    CreatedAt: string;
    CreatedAtIso: Date;
    RetweetCount: number;
    TweetedBy: string;
    MediaUrls: string[];
    TweetLanguageCode: string;
    TweetInReplyToUserId: string;
    Favorited: boolean;
    UserMentions: UserMention2[];
    UserDetails: UserDetails;
}

export interface UserDetails2 {
    FullName: string;
    Location: string;
    Id: any;
    UserName: string;
    FollowersCount: number;
    Description: string;
    StatusesCount: number;
    FriendsCount: number;
    FavouritesCount: number;
    ProfileImageUrl: string;
}

export interface IRawTweet {
    TweetText: string;
    TweetId: string;
    CreatedAt: string;
    CreatedAtIso: string;
    RetweetCount: number;
    TweetedBy: string;
    MediaUrls: string[];
    TweetLanguageCode: string;
    TweetInReplyToUserId: string;
    Favorited: boolean;
    UserMentions: UserMention[];
    OriginalTweet: OriginalTweet;
    UserDetails: UserDetails2;
}
