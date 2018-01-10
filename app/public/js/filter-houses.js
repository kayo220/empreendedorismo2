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
    $('.list-message h4').text('')
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

  $('.rsidebar-top').each(function(){
    var products = document.querySelectorAll('.product-grids')
    var size = products.length;
    var count = 0;
    products.forEach(function(product){
      if(product.classList.contains('hide')){
        count += 1
      }
    })

    var text = '<%= emptyMsg %>';
    if(text){
    }else{
      text = 'Não existem casas com essas características'
    }
    if(size == count){
      $('.list-message h4').text('<%= text %>')
    }
  })

})
