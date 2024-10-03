const dateFormatter = (date?: Date) => {
    if (!date) return "";
  
    const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = date.toLocaleDateString("en-GB", { month: "short" }).toLowerCase();
    const year = date.toLocaleDateString("en-GB", { year: "numeric" });
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    // Format date and time parts separately
    const formattedTime = time.replace(":00", "").toLowerCase(); // Convert PM/AM to lowercase
    return `${day}/${month}/${year} at ${formattedTime}`;
  };
  
  export default dateFormatter;
  