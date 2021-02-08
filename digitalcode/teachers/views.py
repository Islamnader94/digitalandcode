import json
import io, csv
from django.shortcuts import render
from django.http import JsonResponse
from .models import Subject, Teacher
from .serializers import SubjectSerializer, TeacherSerializer, UserSerializer
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginView(APIView):

    def post(self, request):
        try:
            user_name = request.data['user_name']
            user_password = request.data['password']
            user = authenticate(username=user_name, password=user_password)
            if user is not None:
                data = {'authenticated': True}
                return JsonResponse(
                    data,
                    safe=False,
                    status=status.HTTP_200_OK)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception:
            return JsonResponse(
                {'error': 'Something terrible went wrong'},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CSVTeachers(APIView):

    def post(self, request):
        csvFile = io.TextIOWrapper(request.FILES['file'].file)
        data = csv.DictReader(csvFile)
        list_of_dict = list(data)
        try:
            objs = [
                Teacher(
                    first_name=row['First Name'],
                    last_name=row['Last Name'],
                    profile_picture=row['Profile picture'],
                    email=row['Email Address'],
                    phone_number=row['Phone Number'],
                    room_number=row['Room Number'],
                    # subject=Teacher.subject.add(subject[0])
                )
                for row in list_of_dict if row['First Name']
            ]
            teacher_data = Teacher.objects.bulk_create(objs)

            for data in list_of_dict:
                subject_data = data['Subjects taught']
                teacher_email = data['Email Address']
                subject_list = subject_data.split (",")
                for subject_name in subject_list:
                    if not subject_name:
                        pass
                    else:
                        subject = Subject.objects.get_or_create(name=subject_name)
                        teacher = Teacher.objects.filter(email=teacher_email)
                        count_subjects = teacher[0].subject.all().count()
                        if count_subjects <= 4:
                            teacher[0].subject.add(subject[0].id)
                        else:
                            pass

            returnmsg = {
                "message": "Imported Successfully",
                "status_code": 200
            }
        except:
            returnmsg = {
                "message": "Data already exists",
                "status_code": 500
            }

        return JsonResponse(returnmsg)


class TeachersView(APIView):

    def get(self, request):
        try:
            resp = list()
            response = dict()
            subject_list = list()
            teachers = Teacher.objects.all()
            serializer = TeacherSerializer(teachers, many=True)
            teachers_data = serializer.data.copy()

            for item in range(len(serializer.data)):
                for subj_id in serializer.data[item]['subject']:
                    subject = Subject.objects.get(id=subj_id)
                    subj_serializer = SubjectSerializer(subject)
                    subject_list.append(subj_serializer.data)

                del teachers_data[item]['subject']
                response[item] = teachers_data[item]
                response[item].update({'subject': subject_list})
                subject_list = list()

                resp.append(response[item])

            return JsonResponse(
                resp,
                safe=False,
                status=status.HTTP_200_OK)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception:
            return JsonResponse(
                {'error': 'Something terrible went wrong'},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TeacherView(APIView):

    def get(self, request, teacher_id):
        try:
            response = dict()
            subject_list = list()
            teacher = Teacher.objects.get(id=teacher_id)
            serializer = TeacherSerializer(teacher)
            teacher_data = serializer.data
            del teacher_data['subject']

            for subj_id in serializer.data['subject']:
                subject = Subject.objects.get(id=subj_id)
                subj_serializer = SubjectSerializer(subject)
                subject_list.append(subj_serializer.data)

            response['teacher'] = teacher_data
            response['subject'] = subject_list

            return JsonResponse(
                response,
                safe=False,
                status=status.HTTP_200_OK)

        except ObjectDoesNotExist as e:
            return JsonResponse(
                {'error': str(e)},
                safe=False,
                status=status.HTTP_404_NOT_FOUND)

        except Exception:
            return JsonResponse(
                {'error': 'Something terrible went wrong'},
                safe=False,
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
