export const formatVideoTime = (time: number) => {
  try {
    const date = new Date(0);
    date.setSeconds(time);
    const timeString = date.toISOString().slice(11, 19);
    const result = timeString.startsWith("00:0")
      ? timeString.slice(4)
      : timeString.startsWith("00")
      ? timeString.slice(3)
      : timeString;
    return result;
  } catch (error) {
    return "0:00";
  }
};

export const getChapterName = (time: number,chapters:{
  startTime:number;
  endTime:number;
  name:string;
}[]) => {
  try {
    for (const chapter of chapters) {
      if(chapter.startTime<time&&chapter.endTime>time){
        return chapter.name
      }
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(window?.navigator?.userAgent);
