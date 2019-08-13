const db = {
  setDates: (calendarRef, updatedDates) => {
    return calendarRef.update({
      "dates": updatedDates
    }
    );
  },
  getAll: (calendarRef) => {
    return calendarRef.get();
  }
};

export default db;