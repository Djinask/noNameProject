//
//  UploadPhotoViewController.m
//  aMuse
//
//  Created by simone on 10/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "UploadPhotoViewController.h"
#import "HudView.h"

@interface UploadPhotoViewController (){
    UIActivityIndicatorView *spinner;
    BOOL didStartUploading;
}

@end


@implementation UploadPhotoViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    self.tabBarController.hidesBottomBarWhenPushed = YES;
    
    //setto spinner
    spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
    spinner.frame = CGRectMake(0.0, 0.0, 40.0, 40.0);
    spinner.hidesWhenStopped = YES;
    spinner.color = [UIColor colorWithWhite:0.0 alpha:1.0];
    spinner.center = self.view.center;
    [self.view addSubview:spinner];
    
    //aggiungo tap per la tastiera
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(nascondiTastiera)];
    [self.view addGestureRecognizer:tap];
    self.photoImage.image = self.photo;
    self.titleTextField.delegate = self;
    self.descriptionTextField.delegate = self;
    self.cancelButton.enabled = YES;
}


- (void)nascondiTastiera{
    [self.titleTextField resignFirstResponder];
    [self.descriptionTextField resignFirstResponder];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)tornaIndietro{
    [self.navigationController popViewControllerAnimated:YES];
}

-(BOOL)textFieldShouldReturn:(UITextField *)textField{
    [textField resignFirstResponder];
    return YES;
}

-(IBAction)uploadSelectedPhoto{
    if([self.titleTextField.text length]==0 || [self.descriptionTextField.text length] == 0){
        UIAlertView *errore = [[UIAlertView alloc]
                               initWithTitle:@"Errore"
                               message:@"Devi compilare tutti i campi"
                               delegate:nil
                               cancelButtonTitle:@"Ok, capisco"
                               otherButtonTitles: nil];
        [errore show];
    } else {
        //disabilito bottone cancel e faccio sparire la tastiera
        if(!didStartUploading){
            self.uploadButton.enabled = NO;
            didStartUploading = YES;
            self.cancelButton.enabled = NO;
            [self nascondiTastiera];
        
            //faccio la richiesta
            NSData *imageData = UIImageJPEGRepresentation(self.photo, 0.0);
            NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileapi/addphoto"];
            ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:url];
            [request setRequestMethod:@"POST"];
            NSString *fileName = [NSString stringWithFormat:@"iphone.jpg"];
            [request setPostValue:self.titleTextField.text forKey:@"title"];
            [request setPostValue:self.descriptionTextField.text forKey:@"description"];
            [request setData:imageData withFileName:fileName andContentType:@"image/jpeg" forKey:@"photo"];
            [request setPostValue:[[NSUserDefaults standardUserDefaults] valueForKey:@"ID"] forKey:@"id"];
            [request setPostValue:[[NSUserDefaults standardUserDefaults] valueForKey:@"password"] forKey:@"password"];
            [request setDelegate:self];
            [request startAsynchronous];
            [spinner startAnimating];

        }
    }
}
- (void)requestFinished:(ASIHTTPRequest *)request{
    NSLog(@"Prova");
    //controllo che nella pagina di rispsta ci sia la parola succesfully    
    if ([[request responseString]isEqualToString:@"success"]){
        NSLog(@"Success");
        [self uploadSuccess];
    } else {
        NSLog(@"Error Bitch!");
        [self uploadFail];
    }
}

-(void)requestFailed:(ASIHTTPRequest *)request{
    [spinner stopAnimating];
    UIAlertView *error = [[UIAlertView alloc] initWithTitle:@"Errore di Connessione" message:@"Impossibile effettuare il login. Sicuro di essere connesso?" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles: nil];
    [error show];
    self.cancelButton.enabled = YES;
    didStartUploading = NO;
    self.uploadButton.enabled = YES;
}

- (void)uploadSuccess
{
    [spinner stopAnimating];
    UIImage *successImage = [UIImage imageNamed:@"success.png"];
    HudView *hudView = [HudView hudInView:self.navigationController.view animated:YES disappear:YES withImage:successImage];
    hudView.text = @"Foto Salvata";
    hudView.tag = 100;
  //  self.cancelButton.enabled = YES;
    [self.delegate didFinishUploadingPhoto];
    [self performSelector:@selector(removeInfoHud) withObject:nil afterDelay:0.7];
}

- (void)uploadFail
{
    [spinner stopAnimating];
    UIAlertView *alert = [[UIAlertView alloc]
                          initWithTitle:@"Caricamento fallito"
                          message:@"Riprova" delegate:nil cancelButtonTitle:@"Ok"
                          otherButtonTitles: nil];
    [alert show];
    self.cancelButton.enabled = YES;
    self.uploadButton.enabled = YES;
    didStartUploading = NO;
}


-(void)removeInfoHud{
    UIView * subview = nil;
    NSLog(@"Entrato");
    for (subview in [self.navigationController.view subviews]){
        if (subview.tag == 100) {
            NSLog(@"Entrato nel ciclo");
            [subview removeFromSuperview];
            self.navigationController.view.userInteractionEnabled = YES;
            self.cancelButton.enabled = YES;
            [self.navigationController popViewControllerAnimated:YES];
        }
    }
    
}


@end
