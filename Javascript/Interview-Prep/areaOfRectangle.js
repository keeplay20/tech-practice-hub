function areaOfRectangle(length, width) {
  if (length <= 0 || width <= 0) {
    console.log("Length and width should be greater than 0");
    return;
  }
  console.log("Area of rectangle is :", length * width);
  return length * width;
}
areaOfRectangle(5, 10);
areaOfRectangle(5, 0);
areaOfRectangle(0, 10);
areaOfRectangle(0, 0);
areaOfRectangle(-10, 0);
areaOfRectangle(10, -20);
areaOfRectangle(-10, -20);
areaOfRectangle(20, 10);
