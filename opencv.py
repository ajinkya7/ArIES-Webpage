import cv2
img20 = cv2.imread("public/index/img/members/Aayush.jpg",cv2.IMREAD_COLOR)
M=cv2.resize(img20,(362,362))
cv2.imwrite("Aayush1.jpg",M)
