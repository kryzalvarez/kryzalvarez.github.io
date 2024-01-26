 /*
  * Definir objeto de pago
  */ 

  val clipPaymentBuilder = ClipPayment.Builder()
  clipPaymentBuilder.amount(amount: BigDecimal)
  clipPaymentBuilder.customTransactionId(customTransactionId: String?)
  clipPaymentBuilder.enableTips(enabled: Boolean)
  clipPaymentBuilder.roundTips(round: Boolean)
  clipPaymentBuilder.enableContactless(enabled: Boolean)
  clipPaymentBuilder.enablePayWithPoints(enabled: Boolean)
  
  val clipPayment = clipPaymentBuilder.build()
  
  
  
   /*
    * Lanzar pantalla de pago con tarjeta
    */ 
  
  ClipApi.launchPaymentActivity(
      activity: Activity,
      clipPayment: ClipPayment,
      requestCode: Int
  )                
  
  
  
   /*
    * Recibir resultado de la transacción
    */ 
  
  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
      when (requestCode) {
          REQUEST_CODE_PAYMENT -> {
              when (data?.getIntExtra(StatusCode.RESULT_CODE, StatusCode.FAILURE)) {
                  StatusCode.SUCCESSFUL -> {
                      val transactionResult = 
                              data.getParcelableExtra<ClipTransaction>(
                                StatusCode.RESULT_PAYMENT_DATA
                              )
                      // Transaction succeeded
                  }
                  StatusCode.FAILURE -> {
                      // Transaction failed
                  }
              }
          }
          else -> super.onActivityResult(requestCode, resultCode, data)
      }
  }