class Student(object):

    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property
    def age(self):
        return 2015 - self._birth

if __name__ == '__main__':
    print('come into main')
    s = Student()
    s.birth = 20
    print(s.birth)
    print(s._birth)
    print(dir(s))

    print('age',s.age)
    s.age = 'xxxxx'

"""Output:

come into main
20
20
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_birth', 'age', 'birth']
age 1995
Traceback (most recent call last):
  File "test_property.py", line 24, in <module>
    s.age = 'xxxxx'
AttributeError: can't set attribute


"""
