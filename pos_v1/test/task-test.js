describe('loadAllItems', function() {
	var allItems;
	var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
			'ITEM000001',
			'ITEM000001',
			'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('Should return correct barcodeList', function() {

    var result = loadAllBarcodes(inputs);
    var expectResult = [{ barcode: "ITEM000001", number:5 },
                        { barcode: "ITEM000003", number:2 },
                        { barcode: "ITEM000005", number:3 }];
    expect(result).toEqual(expectResult);
  });
});



describe('marchBarcodeList', function() {
  var inputs = [{ barcode: "ITEM000001", number:5 },
                { barcode: "ITEM000003", number:2 },
                { barcode: "ITEM000005", number:3 }];

  it('Should return correct cartItem', function() {

    var result = marchBarcodeList(inputs);
    var expectResult = [{ item: { barcode: 'ITEM000001',
                                  name: '雪碧',
                                  unit: '瓶',
                                  price: 3.00 },
                          number: 5
											  },
                        { item: { barcode: 'ITEM000003',
                                  name: '荔枝',
                                  unit: '斤',
                                  price: 15.00 },
                          number: 2
											  },
                        { item: { barcode: 'ITEM000005',
                                  name: '方便面',
                                  unit: '袋',
                                  price: 4.50 },
                          number: 3
												}];
    expect(result).toEqual(expectResult);
  });
});

describe('calculatePromotion', function() {
  var inputs = [{ item: { barcode: 'ITEM000001',
													name: '雪碧',
													unit: '瓶',
													price: 3.00 },
									number: 5
								},
								{ item: { barcode: 'ITEM000003',
													name: '荔枝',
													unit: '斤',
													price: 15.00 },
									number: 2
								},
								{ item: { barcode: 'ITEM000005',
													name: '方便面',
													unit: '袋',
													price: 4.50 },
									number: 3
								}];

  it('Should return correct receiptItem', function() {
    var result = calculatePromotion(inputs);
    var expectResult =  [{ cartItem: inputs[0], total:12.00, save:3.00 },
                         { cartItem: inputs[1], total:30.00, save:0.00 },
                         { cartItem: inputs[2], total:9.00,  save:4.50 }];
    expect(result).toEqual(expectResult);
  });
});

describe('getReceipt', function() {
  var inputs = [{cartItem:{item: {barcode: 'ITEM000001',
                                  name: '雪碧',
                                  unit: '瓶',
                                  price: 3.00},
                          number:5},
                 total:12.00,
                 save:3.00},
                {cartItem:{item: {barcode: 'ITEM000003',
                                  name: '荔枝',
                                  unit: '斤',
                                  price: 15.00},
                          number:2},
                 total:30.00,
                 save:0.00},
                {cartItem:{item: {barcode: 'ITEM000005',
                                  name: '方便面',
                                  unit: '袋',
                                  price: 4.50},
                           number:3},
                 total:9.00,
                 save:4.50}];

  it('Should return correct receipt', function() {

    spyOn(console, 'log');
    getReceipt(inputs)
    var expectResult =    '***<没钱赚商店>收据***\n' +
                          '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                          '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                          '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
                          '----------------------\n' +
                          '总计：51.00(元)\n' +
                          '节省：7.50(元)\n' +
                          '**********************';
    expect(console.log).toHaveBeenCalledWith(expectResult);
  });
});
