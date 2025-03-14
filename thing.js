const availableShow = [];

function timeConvert(time) {
  let newTime = time.replace(":", "");

  if (newTime.includes("PM")) {
    newTime = Number(newTime.replace("PM", ""));
    newTime += 1200;
  } else {
    newTime = Number(newTime.replace("AM", ""));
  }

  return newTime;
}

function movieBooking(showtimes, groupSize, earliestTime, latestTime) {
  earliestTime = timeConvert(earliestTime);
  latestTime = timeConvert(latestTime);

  showtimes.forEach((showtime) => {
    let av = true;

    if (showtime.availableSeats < groupSize) {
      av = false;
    }

    showtime.time.replace(":", "");

    if (av == true) {
      let totalPrice = groupSize * 15;
      let discount = false;

      if (groupSize >= 6) {
        discount = true;
      }

      if (discount) {
        totalPrice *= 0.95;
      }

      let useTime = timeConvert(showtime.time);

      if (useTime >= earliestTime && useTime <= latestTime) {
        showtime.totalPrice = totalPrice.toFixed(2);
        availableShow.push(showtime);
      }
    }
  });

  return availableShow;
}

console.log(
  movieBooking(
    [{ time: "6:00 PM", availableSeats: 7 }],
    6,
    "6:00 PM",
    "6:00 PM"
  )
);
