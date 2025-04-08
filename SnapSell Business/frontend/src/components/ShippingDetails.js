import styles from './ShippingDetails.module.css';
import DateGenrator from './DateGenrator'

function ShippingDetails() {
  const userName = localStorage.getItem('LoggedInUser');
  const userEmail = localStorage.getItem('LoggedInUserEmail');
  const deliveryDate = DateGenrator();
  return (
    <div className={`${styles.ShippingDetails}`}>
      <p><b>From:</b> SnapSell <a href='snapsell@gmail.com'>[snapsell@gmail.com]</a></p>
      <p><b>Sent:</b> {deliveryDate}</p>
      <p><b>To:</b> {userName} ({userEmail})</p>
      <p><b>Subject:</b> invoice Available</p>
    </div>
  )
}

export default ShippingDetails;