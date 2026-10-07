

class A(object):
       print 'come into A'
       def __init__(self):
              self.__private()
              self.public()
       def __private(self):
              print 'A.__private()'
       def public(self):
              print 'A.public()'
class B(A):
       print 'come into B'
       def __private(self):
              print 'B.__private()'
       def public(self):
              print 'B.public()'
print 'A', dir(A)
print 'B', dir(B)

b = B()

"""
#output:

A.__private()
B.public()

"""

print 'b', dir(b)



"""

output:

A ['_A__private', '__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'public']
B ['_A__private', '_B__private', '__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'public']
A.__private()
B.public()
b ['_A__private', '_B__private', '__class__', '__delattr__', '__dict__', '__doc__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'public']



"""