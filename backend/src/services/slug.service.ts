export class SlugService {
  static generateBase(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  static async generateUnique(
    name: string,
    isSlugTaken: (slug: string) => Promise<boolean>
  ): Promise<string> {
    const baseSlug = this.generateBase(name);
    let slug = baseSlug;
    let counter = 1;
    while (await isSlugTaken(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }
}
