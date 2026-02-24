export class Video {
  constructor(
    public readonly id: string,
    public readonly thumbnail: string,
    public readonly thumbnailAlt: string,
    public readonly title: string,
    public readonly author: string,
    public readonly publishedAt: string,
    public readonly hype: number,
  ) {}
}
