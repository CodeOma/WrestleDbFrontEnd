export const wrestlerFormatter = data => {
  console.log(data);
  const lastName = data.lastName.toUpperCase();

  const name = data.fullName.split(" ");
  const fullName = `${name[0]} ${name[1].toUpperCase()}`;
  const wrestler = {
    lastName,
    team: data.team.toUpperCase(),
    fullName,
  };
  console.log(wrestler);

  return wrestler;
};
export const titleCase = string => {
  const word = string
    .toLowerCase()
    .split(" ")
    .map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
  return word;
};

export const tournamentFormatter = data => {
  const tournament = {
    type: titleCase(data.type),
    year: parseInt(data.year),
    location: {
      city: titleCase(data.location.city),
      country: titleCase(data.location.country),
    },
    name: titleCase(data.name),
  };
  console.log(tournament);

  return tournament;
};

export const youtubeVideoId = link => {
  try {
    const id = link.match(
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i
    );

    return id[1];
  } catch (e) {
    console.log(e);
  }
};

export const timeFormatter = time => {
  const min = Math.floor(parseInt(time) / 60);
  const sec = time - min * 60;
  const timeFormatted = `${min}m ${sec}sec`;
  return timeFormatted;
};
