import styles from './ShippingBrand.module.css';

function ShippingBrand() {

  return (
    <div className={`${styles.brandBusiness}`}>
      <h1 style={{fontFamily:'cursive', color:'blue'}} >SnapSell Business</h1>
      {/* <img src='./media/SnapSell.png' /> */}
      <hr style={{ fontWeight: '1rem', width: '950px', color: 'black', marginLeft: '1rem' }} />
    </div>
  )
}

export default ShippingBrand;