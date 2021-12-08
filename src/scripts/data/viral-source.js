class ViralSource {
  static async list() {
    const response = await fetch('dummy/DATA.json');
    const responseJson = await response.json();
    return responseJson.virals;
  }
}

export default ViralSource;
