$('.price-check input[type="checkbox"]').on('change', function() {
    $('.price-check input[type="checkbox"]').not(this).prop('checked', false);
});

$('.live-check input[type="checkbox"]').on('change', function() {
    $('.live-check input[type="checkbox"]').not(this).prop('checked', false);
});

$('.rsidebar-top').click(function(){
  $('.rsidebar-top').each(function(){
    var products = document.querySelectorAll('.product-grids')
    products.forEach(function(product){
      product.classList.remove('hide')
    })
  })

  $('.price-check input[name="price"]:checked').each(function(){
    var value = this.value;
    var products = document.querySelectorAll('.product-grids')
    products.forEach(function(product){
      var rent = product.querySelector('.rent').innerText
      rent = parseInt(rent)
      if(rent > value){
        product.classList.add('hide')
      }else{
        //product.classList.remove('hide')
      }
    })
  })


  $('.accept-check input[name="accept"]:checked').each(function(){
    var value = this.value;
    //console.log(value)
    var products = document.querySelectorAll('.product-grids')
    products.forEach(function(product){
      var opt = product.querySelector('.'+value).innerText
      if(!opt){
        product.classList.add('hide')
      }else{
        //product.classList.remove('hide')
      }
    })
  })


  $('.live-check input[name="gender"]:checked').each(function(){
    var value = this.value;
    //console.log(value)
    var products = document.querySelectorAll('.product-grids')
    products.forEach(function(product){
      var opt = product.querySelector('.favoritegender').innerText
      console.log(opt)
      if(opt === value || value == 'any'){
        //product.classList.remove('hide')
      }else{
        product.classList.add('hide')
      }
    })
  })

  $('.district-check input[name="district"]:checked').each(function(){
    var value = this.value;
    console.log(value)
    var products = document.querySelectorAll('.product-grids')
    products.forEach(function(product){
      var opt = product.querySelector('.district').innerText
      //console.log(opt)
      if(opt === value || value == 'Nenhum'){
        product.classList.remove('hide-ds')
      }else{
        product.classList.add('hide-ds')
      }
    })
  })

})
