import React, { useContext, useMemo } from "react";
import { EventContext, EventI } from "../../../context/EventContextProvider";
import { User, UserContext } from "../../../context/userContextProvider";
import { isSameOwner } from "../../../utilities/userHelperFunctions";
import dateFormatter from "../../../utilities/dateFormatter";
import "./Dashboard.css"

const Dashboard = () => {
  const { allEvents } = useContext(EventContext);
  const { owner } = useContext(UserContext);

  const myEvents = useMemo(() => {
    return allEvents.filter((event) => isSameOwner(event.owner, owner));
  }, [allEvents]);

  const invitedEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (isSameOwner(event.owner, owner)) return false;
      if (event.guestList.map((i) => i.email).includes(owner?.email ?? ""))
        return true;
      return false;
    });
  }, [allEvents]);

  const recentGifts = useMemo(() => {
    let receivedGifts: {
      user: User;
      amount: number;
      timeStamp: number;
      event: EventI;
    }[] = [];

    myEvents.forEach((event) => {
      event.contributionList.forEach((i) => {
        receivedGifts.push({
          user: i.user,
          amount: i.amount,
          timeStamp: Number(i.timeStamp),
          event : event
        });
      });
    });
    receivedGifts = receivedGifts.sort(
      (a, b) => Number(b.timeStamp) - Number(a.timeStamp)
    );
    return receivedGifts;
  }, [myEvents]);

  const topGuest = useMemo(() => {
    let guestWithContributions: {[email : string] : { user : User , amount : number}} = {};
    recentGifts.forEach(i => {
      if(guestWithContributions.hasOwnProperty(i.user.email)){
        guestWithContributions[i.user.email].amount +=  i.amount 
      }
      else {
        guestWithContributions[i.user.email] = {user : i.user , amount : i.amount};
      }
    })
    return Object.keys(guestWithContributions).map(key => guestWithContributions[key]).sort(
      (a, b) => Number(b.amount) - Number(a.amount)
    );
  }, [recentGifts]);

  console.log(topGuest);

  return (
    <div className="dashboard-container">
      <div className="card recent-gifts">
        <h3>Recent Gifts</h3>
        <table className="recent-gift-list">
          <thead>
            <th>Name</th>
            <th>Event</th>
            <th>Date</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {recentGifts.slice(0, 5).map((i) => (
              <tr key={i.timeStamp}>
                <td>{i.user.name}</td>
                <td>{i.event.title}</td>
                <td>{dateFormatter(new Date(i.timeStamp))}</td>
                <td>{i.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card top-guest">
      <h3>Top Guest</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Contribution</th>
            </tr>
          </thead>
          {
            topGuest.map(i => <tr key={i.user.email}>
              <td className="userName">{i.user.name}</td>
              <td>{i.amount}</td>
            </tr>)
          }
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
