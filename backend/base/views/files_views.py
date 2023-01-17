
from base.models import File_tb
from base.serializers import FileSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyFiles (request):
    user = request.user   
    files = File_tb.objects.filter(user_id=user.id).order_by('-create_at')
    
    
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def FileList(request):
    files =  File_tb.objects.all().order_by('-create_at')
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FileDetail(request, pk):
    try:
        files = File_tb.objects.get(id=pk)
        serilizer = FileSerializer(files, many=False)
        return Response(serilizer.data)
    except File_tb.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateFile(request):
    
    user = request.user 
    data = request.data 
    
    if data and len(data) == 0:
        return Response({'detail': 'No Files yet uploaded'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create file
        files = File_tb.objects.create(
            user_id=user,
            file_file=data['file_file'],
            file_name=data['file_name'],
            description=data['description'],
            size_file=data['size_file'],
            create_at=data['create_at'],
            file_type=data['file_type']
        )
    serilizer = FileSerializer(data=request.data)
    if serilizer.is_valid():
        serilizer.save()
        return Response({'detail':'The File created successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def EditFile(request, pk):
    files = File_tb.objects.get(id=pk)
    serilizer = FileSerializer(instance=files, data=request.data)
    if serilizer.is_valid():
        serilizer.save()
        return Response({'detail':'The File was updated successfully!'}, status=status.HTTP_200_OK)
    return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)
  


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteFile(request, pk):
    product = File_tb.objects.get(id=pk)
    product.delete()
    return Response({'detail':'The File delete successfully!'},
                    status=status.HTTP_200_OK)

