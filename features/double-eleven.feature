@double_eleven
Feature: Double Eleven Bulk Purchase Discount
  As a shopper during Double Eleven promotion
  I want to receive bulk purchase discounts for the same product
  So that I can save money when buying in large quantities

  Background:
    Given the Double Eleven promotion is active

  Scenario: Buy 12 units of the same product with bulk discount
    When a customer places an order with:
      | productName | quantity | unitPrice |
      | 襪子        | 12       | 100       |
    Then the order summary should be:
      | originalAmount | discount | totalAmount |
      | 1200           | 200      | 1000        |
    And the customer should receive:
      | productName | quantity |
      | 襪子        | 12       |

  Scenario: Buy 27 units of the same product with multiple bulk discounts
    When a customer places an order with:
      | productName | quantity | unitPrice |
      | 襪子        | 27       | 100       |
    Then the order summary should be:
      | originalAmount | discount | totalAmount |
      | 2700           | 400      | 2300        |
    And the customer should receive:
      | productName | quantity |
      | 襪子        | 27       |

  Scenario: Buy 10 different products without bulk discount
    When a customer places an order with:
      | productName | quantity | unitPrice |
      | 商品A       | 1        | 100       |
      | 商品B       | 1        | 100       |
      | 商品C       | 1        | 100       |
      | 商品D       | 1        | 100       |
      | 商品E       | 1        | 100       |
      | 商品F       | 1        | 100       |
      | 商品G       | 1        | 100       |
      | 商品H       | 1        | 100       |
      | 商品I       | 1        | 100       |
      | 商品J       | 1        | 100       |
    Then the order summary should be:
      | originalAmount | discount | totalAmount |
      | 1000           | 0        | 1000        |
    And the customer should receive:
      | productName | quantity |
      | 商品A       | 1        |
      | 商品B       | 1        |
      | 商品C       | 1        |
      | 商品D       | 1        |
      | 商品E       | 1        |
      | 商品F       | 1        |
      | 商品G       | 1        |
      | 商品H       | 1        |
      | 商品I       | 1        |
      | 商品J       | 1        |

  Scenario: Multiple products with different bulk discount applications
    When a customer places an order with:
      | productName | quantity | unitPrice |
      | T-shirt     | 15       | 200       |
      | 褲子        | 8        | 300       |
      | 帽子        | 20       | 50        |
    Then the order summary should be:
      | originalAmount | discount | totalAmount |
      | 6400           | 600      | 5800        |
    And the customer should receive:
      | productName | quantity |
      | T-shirt     | 15       |
      | 褲子        | 8        |
      | 帽子        | 20       |

  Scenario: Exactly 10 units of a product gets bulk discount
    When a customer places an order with:
      | productName | quantity | unitPrice |
      | 手套        | 10       | 150       |
    Then the order summary should be:
      | originalAmount | discount | totalAmount |
      | 1500           | 300      | 1200        |
    And the customer should receive:
      | productName | quantity |
      | 手套        | 10       |

  Scenario: Less than 10 units of a product no bulk discount
    When a customer places an order with:
      | productName | quantity | unitPrice |
      | 圍巾        | 9        | 250       |
    Then the order summary should be:
      | originalAmount | discount | totalAmount |
      | 2250           | 0        | 2250        |
    And the customer should receive:
      | productName | quantity |
      | 圍巾        | 9        |